import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Define all principal routes

    router.use('/api/auth', AuthRoutes.routes )
    router.use('/api/user', UserRoutes.routes );
    router.use('/api/employee', UserRoutes.routes );

    return router;
  }
}
