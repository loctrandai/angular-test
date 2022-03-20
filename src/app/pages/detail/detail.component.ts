import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskManagementService } from 'src/app/store/task-management/task-management.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    private builder: FormBuilder,
    private taskManagementService: TaskManagementService
  ) {
    this.setupForm();
    this.message = '';
  }

  ngOnInit(): void {
    // nothing
  }

  setupForm() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      description: [''],
      assigner: ['', Validators.required],
      process: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showMessage('Please input required field!');
      return;
    }


    const body: Task = {
      id: new Date().getTime(),
      ...this.form.getRawValue()
    }

    this.taskManagementService.addNewTask(body);

    this.showMessage('Success add new task!')
    this.setupForm();
  }

  showMessage(value: string) {
    this.message = value;

    setTimeout(() => this.message = '', 3000);
  }
}
