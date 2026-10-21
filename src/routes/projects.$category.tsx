import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$category')({
  component: ProjectCategoryLayout,
})

function ProjectCategoryLayout() {
  return <Outlet />
}
