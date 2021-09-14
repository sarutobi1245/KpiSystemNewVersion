import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { MessageConstants } from 'src/app/_core/_constants/system';
import { Action } from 'src/app/_core/_model/action';
import { Target } from 'src/app/_core/_model/target';
import { TargetYTD } from 'src/app/_core/_model/targetytd';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { Todolist2Service } from 'src/app/_core/_service/todolist2.service';
declare var $: any;
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  providers:[DatePipe]
})
export class PlanComponent implements OnInit, AfterViewInit {
  @Input() data:any;
  @ViewChild('grid') grid: GridComponent;
  pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
  gridData: any;
  toolbarOptions = ['Add', 'Delete', 'Search'];
  policy = '效率精進';
  kpi = 'SHC CTB IE 工時達成率';
  pic = '生產中心 Lai He';
  editSettings = { showDeleteConfirmDialog: false, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };

  actions: Action[] = [];
  target: Target;
  targetYTD: TargetYTD;
  targetValue = null;
  targetYTDValue= null;
  constructor(
    public activeModal: NgbActiveModal,
    public todolist2Service: Todolist2Service,
    private alertify: AlertifyService,
    private dataPipe: DatePipe

    ) { }
  ngAfterViewInit(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  ngOnInit() {
    this.loadData();

  }
  onChangeTarget(value) {
    if (this.target != null) {
      this.target.value = +value;
    } else {
      this.target = {
        id: 0,
        value: +value,
        performance: 0,
        kPIId: this.data.id,
        targetTime: new Date().toISOString(),
      };
    }

    console.log(this.target);
  }
  onChangeTargetYTD(value) {
    if (this.targetYTD != null) {
      this.targetYTD.value = +value;
    } else {
    this.targetYTD = {
      id: 0,
      value: +value,
      createdTime: new Date().toISOString(),
      modifiedBy: null,
      modifiedTime: null,
      createdBy: +JSON.parse(localStorage.getItem('user')).id,
      kPIId: this.data.id
    };
  }
    console.log(this.targetYTD);
  }
  submit() {
    const dataSource = this.grid.dataSource as Action[];
    const actions = dataSource.map(x => {
      return {
        id: x.id,
        target: x.target,
        content: x.content,
        deadline: this.dataPipe.transform(x.deadline, 'MM/dd/yyyy'),
        accountId: +JSON.parse(localStorage.getItem('user')).id,
        kPIId: this.data.id,
        statusId: x.statusId,
      }
    })
    const request = {
      actions: actions,
      target: this.target,
      targetYTD: this.targetYTD
    };
    console.log(request);

    this.todolist2Service.submitAction(request).subscribe(
      (res) => {
        if (res.success === true) {
          this.activeModal.close();
        } else {
          this.alertify.warning(MessageConstants.SYSTEM_ERROR_MSG);
        }
      },
      (err) => this.alertify.warning(MessageConstants.SYSTEM_ERROR_MSG)
    );
  }
  loadData() {
    this.gridData = [];
    this.todolist2Service.getActionsForL0(this.data.id || 0).subscribe(res => {
      this.actions = res.actions as Action[] || [];
      this.pic = res.pic;
      this.policy = res.policy;
      this.kpi = res.kpi;
      this.target = res.target;
      this.targetYTD = res.targetYTD;
      this.targetValue = this.target.value;
      this.targetYTDValue = this.targetYTD.value;
    });
  }

  NO(index) {
    return (this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1;
  }
}