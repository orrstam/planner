declare namespace Planner.Tasks {
  interface Task {
    _id?: string,
    title: string,
    text: string,
    deleted?: boolean
  }
  interface Icon {
    icon: string,
    onClick?: () => any
  }
}
