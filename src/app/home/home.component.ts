import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ClothesService } from '../AuthService/clothes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clothesService: ClothesService,
  ) { }
  clothing: any[] = [];

  handleSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    const codclothing = inputElement.value;
    this.spinner.show();

    this.clothesService.getSearchClothes(codclothing).subscribe(
      (data: any) => {
        if (data.error === false) {
          if (this.clothing) {
            this.clothing = [...this.clothing, data.data];
          } else {
            this.clothing = [data.data];
          }
          console.log('this.clothing:', this.clothing);
        } else {
          this.toastr.error(data.message || 'Erro ao buscar');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Erro ao buscar: ' + error.message);
        this.spinner.hide();
      }
    );
  }
  
  getTotalResale(): number {
    return this.clothing?.reduce((total, item) => total + parseFloat(item.resale || 0), 0) || 0;
  }

  removeItem(itemId: number): void {
    this.clothing = this.clothing.filter(item => item.id !== itemId);
    console.log('Item removido:', itemId);
  }

  onCartClick(): void {
    this.router.navigate(['/control'], { state: { clothing: this.clothing } });
  }

}
