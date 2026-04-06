import type { Request, Response } from "express";
type Params = {
    key: string;
};
export declare function set(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function get(req: Request<Params>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function remove(req: Request<Params>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=store.controller.d.ts.map