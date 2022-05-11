import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TareaResponse } from '@app/shared/models/tarea.interface';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HomeService } from '../home/service-home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('modalAgregar') modalAgregar: ElementRef;
  private subscription: Subscription = new Subscription();
  private modalRefAgregar: NgbModalRef;
  listaTareas: TareaResponse[];
  edit: boolean;
  add: boolean;
  idTarea: number;

  tareasForm = this.fb.group({
    prioridad_tarea: [''],
    tipo_tarea: [''],
    descripcion_tarea: [''],
    propietario_tarea: ['']
  })

  constructor(
    private rutaActiva: ActivatedRoute,
    private homeSvc: HomeService,
    private authSvc: AuthService,
    private modal: NgbModal,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTareasUsuario(this.rutaActiva.snapshot.params.usuarioId);
  }

  getTareasUsuario(usuaroId: number) {
    this.listaTareas = [];
    this.tareasForm.get('prioridad_tarea')?.setValue('');
    this.tareasForm.get('tipo_tarea')?.setValue('');
    this.tareasForm.get('descripcion_tarea')?.setValue('');
    this.tareasForm.get('propietario_tarea')?.setValue('');
    if (!usuaroId) {
      return;
    }
    this.subscription.add(
      this.homeSvc.getTareasUsuario(usuaroId).subscribe((res) => {
        if (res) {
          this.listaTareas = res;
        }
      })
    );
  }

  onClickTarea(dataEdit?: any) {
    const modalOptions: NgbModalOptions = {
      centered: true,
      size: 'lg',
      keyboard: false,
      backdrop: 'static',
    };

    if(dataEdit){
      this.idTarea = dataEdit.id
      this.tareasForm.get('prioridad_tarea')?.setValue(dataEdit.prioridad_tarea);
      this.tareasForm.get('descripcion_tarea')?.setValue(dataEdit.descripcion_tarea);
      this.tareasForm.get('tipo_tarea')?.setValue(dataEdit.tipo_tarea);
      this.edit = true;
      this.add = false;
    }else{
      this.tareasForm.get('prioridad_tarea')?.setValue('');
      this.tareasForm.get('tipo_tarea')?.setValue('');
      this.tareasForm.get('descripcion_tarea')?.setValue('');
      this.add = true;
      this.edit = false;
    }

    this.modalRefAgregar = this.modal.open(this.modalAgregar, modalOptions);
  }

  onCancelAdd(){
    this.modalRefAgregar.close();
  }

  onAcept(action: string){
    this.tareasForm.get('propietario_tarea')?.setValue(this.rutaActiva.snapshot.params.usuarioId);
    if (this.tareasForm.invalid) {
      return;
    }
    const formValue = this.tareasForm.value;
    if(action == "add"){
      this.subscription.add(
        this.homeSvc.newTareasUsuario(formValue).subscribe((res) => {
          this.getTareasUsuario(this.rutaActiva.snapshot.params.usuarioId);
          this.modalRefAgregar.close();
        })
      );
    }else if(action == "edit"){
      this.subscription.add(
        this.homeSvc.updateTareasUsuario(this.idTarea, formValue).subscribe((res) => {
          this.getTareasUsuario(this.rutaActiva.snapshot.params.usuarioId);
          this.modalRefAgregar.close();
        })
      );
    }
    
  }

  onDelete(idTarea: number){
    if (!idTarea) {
      return;
    }
    this.subscription.add(
      this.homeSvc.deleteTareasUsuario(idTarea).subscribe((res) => {
        this.getTareasUsuario(this.rutaActiva.snapshot.params.usuarioId);
      })
    );
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
