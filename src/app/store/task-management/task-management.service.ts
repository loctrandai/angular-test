import { Inject, Injectable } from "@angular/core";
import { PersistState } from "@datorama/akita";
import { Task } from "src/app/models/task";
import { TaskManagementStore } from "./task-management.store";

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  constructor(
    @Inject('persistStorage') private persistStorage: PersistState,
    private taskManagementStore: TaskManagementStore
    ) {}

  addNewTask(task: Task) {
    try {
      const data = [
        ...this.taskManagementStore.getValue().data,
        task
      ];
      this.taskManagementStore.update({ data: data });
    } catch(error) {
      this.taskManagementStore.setError(error);
    }
  }

  getAll() {
    return this.taskManagementStore.getValue().data;
  }

  reset() {
    this.persistStorage.clearStore('task-management');
  }
}