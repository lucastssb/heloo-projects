import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { connectToDatabase } from "../../../../services/db";

// TODO: surround database operations with try statements

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;

  const { client, db } = await connectToDatabase();

  if (req.method === "GET") {
    // Verify is the db client is connected
    if (client.isConnected()) {
      const data = await db
        .collection(process.env.MONGODB_DB_COLLECTION)
        .findOne({ slug });

      if (data) {
        return res.status(200).json(JSON.stringify(data));
      }
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(500).json({ error: "client DB is not connected" });
  }

  if (req.method === "PUT") {
    const {
      description,
      viability,
      status,
    } = req.body;

    // Verify is the db client is connected
    if (client.isConnected()) {
      const project = await db
        .collection(process.env.MONGODB_DB_COLLECTION)
        .findOne({ slug });

      // Verify if the project exists
      if (!project) {
        return res
          .status(500)
          .json({ error: "Can't update a project that does not exist!" });
      }

      // Verify if status is "concluído"
      if (project.status === "Concluído") {
        return res
          .status(500)
          .json({ error: "Can't update a finished project !" });
      }

      // Verify if status is "cancelado"
      if (project.status === "Cancelado") {
        return res
          .status(500)
          .json({ error: "Can't update a canceled project !" });
      }

      let data;

      if (status === "Concluído" || status === "Cancelado") {
        data = {
          description,
          viability,
          updated_at: new Date(),
          final_status_date: new Date(),
          status,
        };
      } else {
        data = {
          description,
          viability,
          updated_at: new Date(),
          status,
        };
      }

      // Create a schema for data validation
      const schema = Yup.object().shape({
        description: Yup.string().required(),
        viability: Yup.number().required(),
        updated_at: Yup.date().required(),
        final_status_date: Yup.date(),
        status: Yup.string().required(),
      });

      // Validate data
      await schema.validate(data, {
        abortEarly: false,
      });

      const updateDocument = {
        $set: {
          description: data.description,
          viability: data.viability,
          status: data.status,
          updated_at: data.updated_at,
          final_status_date: data.final_status_date,
        }
      }

      // Update project on db
      const updatedProject = await db
        .collection(process.env.MONGODB_DB_COLLECTION)
        .updateOne({ slug: slug }, updateDocument);

      return res.status(200).json(updatedProject);
    }

    return res.status(500).json({ error: "client DB is not connected" });
  }

  if (req.method === "DELETE") {
    if (client.isConnected()) {
      const deletedProject = await db.collection(process.env.MONGODB_DB_COLLECTION).findOneAndDelete({ slug });

      if (deletedProject.value) {
        return res.status(200).json(deletedProject);
      } else {
        return res.status(500).json({ error: "Can't delete a non existing project!" });
      }
    }
  }
};