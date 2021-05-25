import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.service.formData = {
        id: null,
        fullName: "",
        email: "",
        pincode: null,
        mobile: "",
        password: ""
      };
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection("employees").add(data);
      // this.afAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      // .then((result) => {
      //   // set account  doc
      //     let created_data = JSON.parse(JSON.stringify(result.user));
      //     const account = {
      //     uid: result.user.uid,
      //     created_time: created_data.createdAt,
      //     email:  result.user.email,
      //     display_name: username,
      //     photoURL: result.user.photoURL,
      //   }
      //   this.afs.set(account);
      // }).catch((error) => {
      //   window.alert(error.message)
      // })
      this.toastr.success("Submitted Successsfully", "EMP.Register");
    } else {
      this.firestore.doc("employees/" + form.value.id).update(data);
      this.toastr.success("Submitted Successsfully", "EMP.Register");
    }
    // this.resetForm(form);
  }
}
