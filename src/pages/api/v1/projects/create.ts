import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import { connectToDatabase } from "../../../../services/db";

// TODO: not allow special characters on slug
// TODO: surround database operations with try statements

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { client, db } = await connectToDatabase();

  if (req.method === "POST") {
    const {
      name,
      description,
      viability,
      start_date,
      end_date,
      status,
      value,
      name_responsible,
    } = req.body;

    // Generate a slug from the name
    const slug = name
      .toLowerCase()
      .replace(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Verify is the db client is connected
    if (client.isConnected()) {
      const project = await db
        .collection(process.env.MONGODB_DB_COLLECTION)
        .findOne({ slug });

      if (project) {
        return res
          .status(400)
          .json({ error: "There is a project with the same name" });
      }

      const data = {
        name,
        description,
        viability,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        created_at: new Date(),
        updated_at: "",
        final_status_date: "",
        status,
        value,
        name_responsible,
        slug,
      };

      // Create a schema for data validation
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        viability: Yup.number().required(),
        start_date: Yup.date().required(),
        end_date: Yup.date().required(),
        created_at: Yup.date().required(),
        status: Yup.string().required(),
        value: Yup.string().required(),
        name_responsible: Yup.string().required(),
        slug: Yup.string().required(),
      });

      // Validate data
      await schema.validate(data, {
        abortEarly: false,
      });

      // Insert new project on db
      const { ops: newProject } = await db
        .collection(process.env.MONGODB_DB_COLLECTION)
        .insertOne(data);

      return res.status(201).json(newProject[0]);
    }

    return res.status(500).json({ error: "client DB is not connected" });
  }
};
