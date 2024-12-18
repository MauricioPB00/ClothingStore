import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ClothesService } from '../AuthService/clothes.service';

interface Supplier {
  id: number;
  name: string;
  city: string;
  phone: string;
}
@Component({
  selector: 'app-register-clothes',
  templateUrl: './register-clothes.component.html',
  styleUrls: ['./register-clothes.component.css']
})
export class RegisterClothesComponent {
  nextID: number;
  suppliers: Supplier[] = [];
  supplier: Supplier = {
    id: 0,
    name: '',
    city: '',
    phone: ''
  };
  selectedSupplier: number | null = null;
  clothes = { name: '', size: '', bought: '', resale: '' };
  isSuppliers = false;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clothesService: ClothesService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getLastRegisterID();
    this.getSuppliers();
  }

  getLastRegisterID() {
    this.clothesService.getLastRegisterID().subscribe(
      data => {
        this.nextID = data.nextId;
        this.spinner.hide();
      },
      error => {
        this.showAlert(error.error);
        this.spinner.hide();
      })
  }

  getSuppliers() {
    this.clothesService.getSuppliers().subscribe(
      data => {
        this.suppliers = data;
        this.spinner.hide();
      },
      error => {
        this.showAlert(error.error);
        this.spinner.hide();
      })
  }

  registerClothes(): void {
    this.spinner.show();
    let aux = {
      name: this.clothes.name,
      size: this.clothes.size,
      bought: this.clothes.bought,
      resale: this.clothes.resale,
      supplier: this.selectedSupplier,
    };

    this.clothesService.postRegisterClothes(aux).subscribe(
      (data: any) => {
        console.log(data);
        if (data.error === false) {
          this.toastr.success('Registrado com sucesso');
          this.clothes = { name: '', size: '', bought: '', resale: '' };
          this.selectedSupplier = null;
          this.getLastRegisterID()
        } else {
          this.toastr.error(data.message || 'Erro ao registrar');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Erro ao registrar: ' + error.message);
        this.spinner.hide();
      }
    );
  }
  back(){
    this.isSuppliers = !this.isSuppliers;
  }

  addSupplier() {
    this.isSuppliers = !this.isSuppliers;
  }

  register(){
    let aux = {
      name: this.supplier.name,
      city: this.supplier.city,
      phone: this.supplier.phone,
    }
    this.clothesService.postRegisterSupplier(aux).subscribe(
      (data: any) => {
        if (data.error === false) {
          this.toastr.success('Registrado com sucesso');
          this.supplier = { id: 0, name: '', city: '', phone: ''};
          this.selectedSupplier = null;
        } else {
          this.toastr.error(data.message || 'Erro ao registrar');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Erro ao registrar: ' + error.message);
        this.spinner.hide();
      }
    );
  }

  showAlert(data: any) {
    if (data != undefined) {
      this.toastr.error(JSON.stringify(data));
      if (data.erro == true) {
        this.toastr.error(data.mensagem);
      } else if (data.erro == false) {
        this.toastr.success(data.mensagem);
      } else {
      }
    }
  }
}
