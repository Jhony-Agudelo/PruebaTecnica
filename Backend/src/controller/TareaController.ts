import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Tareas } from "../entity/Tareas";

export class TareaController {
  static getAll = async (req: Request, res: Response) => {
    const tareaRepository = getRepository(Tareas);
    let tareas;

    try {
      tareas = await tareaRepository.find({
        select: [
          "id",
          "prioridad_tarea",
          "tipo_tarea",
          "descripcion_tarea",
          "propietario_tarea",
        ],
      });
    } catch (e) {
      res.status(404).json({ message: "Somenthing goes wrong!" });
    }

    if (tareas.length > 0) {
      res.send(tareas);
    } else {
      res.status(404).json({ message: "Not result" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tareaRepository = getRepository(Tareas);
    try {
      const tarea = await tareaRepository.findOneOrFail(id);
      res.send(tarea);
    } catch (e) {
      res.status(404).json({ message: "Not result" });
    }
  };

  static getByPropietario = async (req: Request, res: Response) => {
    const { propietario_tarea } = req.params;
    const tareaRepository = getRepository(Tareas);
    try {
      const tarea = await tareaRepository.find({
        where: [{ propietario_tarea: propietario_tarea }],
      });
      res.send(tarea);
    } catch (e) {
      res.status(404).json({ message: "Not result" });
    }
  };

  static new = async (req: Request, res: Response) => {
    const {
      id,
      prioridad_tarea,
      tipo_tarea,
      descripcion_tarea,
      propietario_tarea,
    } = req.body;
    const tarea = new Tareas();

    tarea.id = id;
    tarea.prioridad_tarea = prioridad_tarea;
    tarea.tipo_tarea = tipo_tarea;
    tarea.descripcion_tarea = descripcion_tarea;
    tarea.propietario_tarea = propietario_tarea;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(tarea, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const tareaRepository = getRepository(Tareas);
    try {
      await tareaRepository.save(tarea);
    } catch (e) {
      return res.status(409).json({ message: "Username already exist" });
    }

    // All ok
    res.send("tarea created");
  };

  static edit = async (req: Request, res: Response) => {
    let tarea;
    const { id } = req.params;
    const {
      prioridad_tarea,
      tipo_tarea,
      descripcion_tarea,
      propietario_tarea,
    } = req.body;

    const tareaRepository = getRepository(Tareas);
    // Try get tarea
    try {
      tarea = await tareaRepository.findOneOrFail(id);
      tarea.prioridad_tarea = prioridad_tarea;
      tarea.tipo_tarea = tipo_tarea;
      tarea.descripcion_tarea = descripcion_tarea;
      tarea.propietario_tarea = propietario_tarea;
    } catch (e) {
      return res.status(404).json({ message: "tarea not found" });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(tarea, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save tarea
    try {
      await tareaRepository.save(tarea);
    } catch (e) {
      return res
        .status(409)
        .json({ message: "Username alreadytareaRepository in use" });
    }

    res.status(201).json({ message: "tarea update" });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tareaRepository = getRepository(Tareas);
    let tarea: Tareas;

    try {
      tarea = await tareaRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: "tarea not found" });
    }

    // Remove tarea
    tareaRepository.delete(id);
    res.status(201).json({ message: " tarea deleted" });
  };
}

export default TareaController;
