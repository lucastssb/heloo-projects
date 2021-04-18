// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.json({
      data: [
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
        {
          name: "Primeiro projeto",
          description: "Muito legal",
          viability: 5,
          start_date: "20/04/2021",
          end_date: "20/05/2021",
          status: "Planejado",
          value: "10000",
          name_responsible: "Lucas Barbosa",
        },
      ],
    });
  }
};
