import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { TaskManagementQuery } from 'src/app/store/task-management/task-management.query';
import { TaskManagementService } from 'src/app/store/task-management/task-management.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  dataSource: Task[];
  orginDataSource: Task[];

  constructor(
    private builder: FormBuilder,
    private taskManagementQuery: TaskManagementQuery,
    private taskManagementService: TaskManagementService
  ) {
    this.dataSource = [];
    this.setupForm();
  }

  ngOnInit(): void {
    this.initData();
    this.listenDataChange();

    this.form.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.onFilterData();
    });
  }

  initData() {
    this.orginDataSource = this.taskManagementService.getAll();
    this.onFilterData();
  }

  listenDataChange() {
    this.taskManagementQuery.data$.subscribe((data: Task[]) => {
      this.orginDataSource = data;
      this.onFilterData();
    })
  }

  setupForm() {
    this.form = this.builder.group({
      search: '',
      process: ''
    })
  }

  onFilterData() {
    let data = [];
    const form = this.form.getRawValue();

    if (form.search === '' && form.process === '') {
      data = this.orginDataSource;
    } else {
      data = this.orginDataSource.filter((element: Task) => {
        return (form.process !== '' ? element.process === form.process : true)
          && (form.search !== '' ? element.name.toLowerCase().includes(form.search.toLowerCase()) : true)
      });
    }

    this.dataSource = data;
  }
}
