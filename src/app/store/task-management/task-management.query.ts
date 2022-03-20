import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskManagementState, TaskManagementStore } from './task-management.store';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementQuery extends Query<TaskManagementState> {
  allState$ = this.select();
  data$: Observable<Task[]> = this.select(state => state.data);

  
  constructor(protected store: TaskManagementStore) {
    super(store);
  }
}
