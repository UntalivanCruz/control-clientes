import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente, ClienteWithId } from '../../modelo/cliente.model';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteWithId[];
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }

  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private clienteService: ClienteServicio, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(valor => this.clientes = valor)
  }

  getSaldoTotal():number{
    let saldoTotal: number=0;
    if(this.clientes){
      this.clientes.forEach(cliente => saldoTotal+= cliente.saldo)
    }
   return saldoTotal;
  }


agregar({value,valid}:{value:Cliente,valid:boolean}){
  if(!valid){
    this.flashMessages.show('Por favor llena el formulario correctamente',{
      cssClass:'alert-danger',timeout:4000
    })
  }else{
    this.clienteService.agregarCliente(value);
    this.clienteForm.resetForm();
    this.cerrarModal();
  }
}


private cerrarModal(){
  this.botonCerrar.nativeElement.click();
}
}
