import type { Request, Response } from "express";
import store from "../services/store.service.js";

type Params = {
    key: string
}

export async function set(req: Request, res: Response) {
  const { key, value } = req.body || {};

  if (key === undefined || value === undefined) {
    return res
      .status(400)
      .json({ status: 400, message: "key string and its value are required" });
  }

  if (key === "" || value === "") {
    return res
      .status(400)
      .json({ status: 400, message: "key and value string cannot be empty" });
  }

  store.set(key, value);

  return res.status(201).json({
    status: 201,
    message: "key and value stored successfully",
  });
}

export async function get(req: Request<Params>, res: Response) {
  const key = req.params.key;

  if (key === undefined) {
    return res.status(400).json({ status: 400, message: "key is required" });
  }

  if (key === "") {
    return res
      .status(400)
      .json({ status: 400, message: "key cannot be empty" });
  }

  const value = store.get(key);

  if (value === undefined) {
    return res.status(404).json({ status: 404, message: "key not found", data: null });
  }

  res.status(200).json({
    status: 200,
    message: "key fetched successfullt",
    data: value,
  });
}

export async function remove(req: Request<Params>, res: Response) {
  const key = req.params.key;

  if (!key) {
    return res.status(400).json({ status: 400, message: "key is required" });
  }

  if (key === "") {
    return res
      .status(400)
      .json({ status: 400, message: "key cannot be empty" });
  }

  if (!store.has(key)) {
    return res.status(404).json({ status: 404, message: "key not found" });
  }

  store.remove(key);

  res.status(200).json({
    status: 200,
    message: "key removed successfullt",
    data: null,
  });
}
