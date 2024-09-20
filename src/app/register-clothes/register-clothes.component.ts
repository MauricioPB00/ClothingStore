import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ClothesService } from '../AuthService/clothes.service';


@Component({
  selector: 'app-register-clothes',
  templateUrl: './register-clothes.component.html',
  styleUrls: ['./register-clothes.component.css']
})
export class RegisterClothesComponent {
  nextID: number;
  clothes = { name: '', size: '', bought: '', resale: '' };

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clothesService: ClothesService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.buscarCadastroID();
  }

  buscarCadastroID() {
    this.clothesService.buscarCadastroID().subscribe(
      data => {
        this.nextID = data.nextId;
        this.spinner.hide();
      },
      error => {
        this.showAlert(error.error);
        this.spinner.hide();
      })
  }

  register(): void {
    this.spinner.show();  
    let aux = {
      name: this.clothes.name,
      size: this.clothes.size,
      bought: this.clothes.bought,
      resale: this.clothes.resale,
    };

    this.clothesService.postRegisterClothes(aux).subscribe(
      (data: any) => {  
        if (data.error === false) { 
          this.toastr.success('Registrado com sucesso');
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
