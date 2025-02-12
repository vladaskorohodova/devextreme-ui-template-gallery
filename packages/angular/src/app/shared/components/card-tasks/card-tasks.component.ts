import {
  Component, Input, NgModule, OnChanges, SimpleChanges, ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { RowDraggingReorderEvent } from 'devextreme/ui/data_grid';
import { Task } from '../../types/task';

@Component({
  selector: 'card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.scss'],
})
export class CardTasksComponent implements OnChanges {
  @ViewChild('dataGrid', { static: false }) component: DxDataGridComponent;

  @Input() tasks: Task[];

  currentTasks: Task[];

  isLoading = true;

  constructor() {
    this.onReorder = this.onReorder.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.tasks?.currentValue;

    if (!this.isLoading) {
      this.currentTasks = changes.tasks.currentValue.filter((item) => !!item.status && !!item.priority);
    }
  }

  onReorder(e: RowDraggingReorderEvent) {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = this.currentTasks.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = this.currentTasks.indexOf(e.itemData);

    this.currentTasks.splice(fromIndex, 1);
    this.currentTasks.splice(toIndex, 0, e.itemData);
  }
}

@NgModule({
  imports: [DxDataGridModule, DxLoadPanelModule, CommonModule],
  declarations: [CardTasksComponent],
  exports: [CardTasksComponent],
})
export class CardTasksModule { }
