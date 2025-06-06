import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
    {
        path: "auth",
        loadChildren: () =>
            import("./pages/auth/auth.module").then((m) => m.AuthModule),
    },
    {
        path: "main",
        loadChildren: () =>
            import("./pages/main/main.module").then((m) => m.MainModule),
        canActivate: [AuthGuard],
    },
    {
        path: "",
        redirectTo: "/main",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "/main",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
