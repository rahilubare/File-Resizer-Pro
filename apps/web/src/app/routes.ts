import { type RouteConfigEntry, index, route } from "@react-router/dev/routes";

export default [
	index("./page.tsx"),
	route("*", "./__create/not-found.tsx"),
] satisfies RouteConfigEntry[];
