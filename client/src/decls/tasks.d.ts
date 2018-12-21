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

declare namespace Planner.Tasks.Forms {
  interface SubmitValues {
    _id?: string,
    title: string,
    text: string,
    option?: any
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
