import { Injectable, NgModule } from '@angular/core';
import { Employee } from './employee.model';
import { FormsModule } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  imports:
  [
    FormsModule,
  ]
})


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  constructor(private firestore: AngularFirestore) { }
  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }
}
