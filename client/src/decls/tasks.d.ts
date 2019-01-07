declare namespace Planner.Tasks {
  interface Task {
    _id?: string,
    title: string,
    text: string,
    types: Planner.TaskTypes.Type[]
    deleted?: boolean
  }
  interface Icon {
    icon: string,
    onClick?: () => any
  }
}

declare namespace Planner.Tasks.Forms {
  interface SubmitValues {
    _id?: string,
    title: string,
    text: string,
    types: any
  }
  interface Option {
    value?: string,
    label?: string
  }
}

declare namespace Planner.TaskTypes {
  interface Type {
    _id?: string,
    name: string
  }
}
