import "reflect-metadata";
import express from "express";
import { Routes } from "./interfaces/routes.interface";
export declare class App {
    private app;
    port: string | number;
    env: string;
    constructor(routes: Routes[]);
    listen(): void;
    getServer(): express.Application;
    private connectDB;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeSwagger;
    private initializeErrorHandling;
}
