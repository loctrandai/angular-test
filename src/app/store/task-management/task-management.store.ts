import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Task } from 'src/app/models/task';

export interface TaskManagementState {
  data: Task[]
}

export function createInitialState(): TaskManagementState {
  return {
    data: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'task-management' })
export class TaskManagementStore extends Store<TaskManagementState> {
  constructor() {
    super(createInitialState());
  }
}