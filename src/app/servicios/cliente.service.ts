import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente, ClienteWithId } from '../modelo/cliente.model';
import { map } from 'rxjs/operators'

@Injectable()
export class ClienteServicio {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection<Cliente>('clientes');
  }

  getClientes(): Observable<ClienteWithId[]> {
    //Obtener los clientes
    return this.clientesColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    )
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    return this.clienteDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists == false) {
          return null;
        }
        else {
          const data = actions.payload.data() as Cliente;
          const id = actions.payload.id;
          return { id, ...data };
        }
      })
    );
  }

  modificarCliente(cliente:ClienteWithId){
    this.clienteDoc=this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente:ClienteWithId){
    this.clienteDoc=this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
}