import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      fullName: "",
      email: "",
      pincode: null,
      mobile: "",
      password: ""
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    let auth = firebase.auth();
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection("employees").add(data);
    } else this.firestore.doc("employees/" + form.value.id).update(data);
    this.resetForm(form);
  }
}
