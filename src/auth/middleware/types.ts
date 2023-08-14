import { ReactNode } from "react";

export interface AuthProps extends RouteGuard  {
}

export interface GuardProps extends RouteGuard {
}

interface RouteGuard {
    children : ReactNode;
}