import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { IUsers } from '../Model/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList:IUsers[]=[]
  userForm!:FormGroup
  selectedIndex!: number;
  mode:string=""
  usersListInitiale  : IUsers[]=[];
  // confirmDialog!:MatDialogRef<any> 
  constructor(private fb:FormBuilder,private dialog:MatDialog) { }

  
  ngOnInit(): void {
    this.usersList 
    this.usersListInitiale 
    //retreave data from local storage
    const storedData = localStorage.getItem('usersList');
  if (storedData) {
    this.usersList = JSON.parse(storedData);
  }   
  }
  openModalAjout(content:any){
    this.mode='Ajouter'
    this.userForm = this.createForm()
    this.dialog.open(content, 
      {panelClass:'modal-sm', disableClose:true,hasBackdrop:true,autoFocus:true,closeOnNavigation:true})
  }
  createForm(data?:IUsers){
    console.log('data',data);
    
    return this.fb.group({
      nom: [data? data.nom: '',Validators.required],
      prenom: [data? data.prenom:'',Validators.required],
      date_naissance: [data? data.date_naissance:'',Validators.required],
      numtel: [data? data.numtel:'',Validators.required],
      email: [data? data.email:'',Validators.required],
      adresse: [data? data.adresse:'',Validators.required],
    })
   
  }
 
  onSave(){
    if(this.userForm.valid){
      if(this.mode=='Ajouter'){
      const user = this.userForm.value;
      this.usersListInitiale.unshift(user);
      
    }
      else{
        this.usersListInitiale[this.selectedIndex]= {...this.usersListInitiale[this.selectedIndex], ...this.userForm.value}
      }
      this.usersList=this.usersListInitiale  
      console.log(this.usersList); 
      localStorage.setItem('usersList', JSON.stringify(this.usersList));
      this.userForm.reset();
      this.dialog.closeAll();
    }
    else {
      //si le formulaire n'est pas valid, mark as dirty pour indiquer les champs à remplir ou bien les champs invalides
      this.userForm.markAllAsTouched()
      this.userForm.markAsDirty()
      
    }
  }
  onSubmit(){
    console.log(this.userForm.value)
  }
  closeModal(){
    this.dialog.closeAll();
     
  }
  editUser(element:IUsers,index:number, content:any){
    this.mode='modifier'
    this.selectedIndex = index
    this.userForm= this.createForm(element)
    this.dialog.open(content, {panelClass:'modal-sm',
     disableClose:true,hasBackdrop:true,autoFocus:true,closeOnNavigation:true})
    console.log('edit form',this.userForm.value);
    console.log('edit form',element);
    console.log('create form',this.createForm(element).value);
    
   
  }
  deleteUser( index:number){
    this.selectedIndex = index
    this.usersListInitiale.splice(index, 1);
    this.usersList= this.usersListInitiale
  }
    get Nom(){
    return this.userForm.get('nom') 
    }
    get PreNom(){
    return this.userForm.get('prenom') 
    }
    get DateNaissance(){
    return this.userForm.get('date_naissance') 
    }
    get NumTel(){
    return this.userForm.get('numtel') 
    }
    get Email(){
    return this.userForm.get('email') 
    }
    get Adresse(){
    return this.userForm.get('adresse') 
    }
}
