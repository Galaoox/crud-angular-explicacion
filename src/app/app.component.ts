import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiFoodService } from './services/api-food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'crud-angular';
  listFood: any[] = [];
  form: FormGroup;

  idFood: string | null = null;

  constructor(private _apiFood : ApiFoodService, private fb: FormBuilder){
    this.form = this.crearFormulario();
  }

  ngOnInit(){

    this.obtenerFood();
  }

  obtenerFood(){
    this._apiFood.listar().subscribe({
      next: (result: any) => {
        this.listFood = result.data;
      },
      error: (e) => console.error(e),
    })
  }

  crearFormulario(){
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });
  }

  crearFood(datos: any){
    this._apiFood.crear(datos).subscribe({
      next: (result: any) => {
        alert(result.msg);
        this.form.reset();
        this.obtenerFood();
      },
      error: (error)=> console.error(error)
    })
  }

  onSubmit(){
    if(this.form.invalid){
      alert('FALTAN CAMPOS DEL FORMULARIO POR DILIGENCIAR')
    }else{
      if(this.idFood){
        this.editarFood(this.form.value, this.idFood);
      }else{
        this.crearFood(this.form.value);
      }
    }
  }

  eliminarFood(_id: string){
    const confirmacion = confirm('Desea eliminar la comida?');
    if(confirmacion){
      console.log(_id);
      this._apiFood.eliminar(_id).subscribe({
        next: (result: any) => {
          alert(result.msg);
          this.obtenerFood();
        },
        error: (error)=> console.error(error)
      });
      this.obtenerFood();
    }
  }

  obtenerDataEditar(food: any){
    this.form.get('nombre')?.setValue(food.nombre);
    this.idFood = food._id;
    this.form.patchValue({
      descripcion: food.descripcion,
      precio: food.precio,
      categoria: food.categoria
    })

  }

  editarFood(datos: any, _id: string){
    this._apiFood.editar(datos, _id).subscribe({
      next: (result: any) => {
        alert(result.msg);
        this.form.reset();
        this.idFood = null;
        this.obtenerFood();
      },
      error: (error)=> console.error(error)
    })
  }

}
