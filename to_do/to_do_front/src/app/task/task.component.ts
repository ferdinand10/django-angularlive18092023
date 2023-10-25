import { Component } from '@angular/core';
import { Task } from '../Models/Taches';
import { TaskService } from '../Services/TaskService.service';
import { NotificationService } from '../Services/NotificationService.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
 
  affichage:boolean=true;

  testId:boolean=false;

 

  Tasks:Task[]=[];
  priorityChoice=[
    { value: "basse", label: 'basse' },
    { value: "Moyenne", label: 'Moyenne' },
    { value: "Elevée", label: 'Elevée' },
  ]

  public nbreTasks=0;
  task=new Task()

  message:string="";
  isafficherMessageChargement:boolean=true;
  alertColor:string="";
  
  constructor(
    private taskService:TaskService,
    private notificationService:NotificationService
    ) { }

  ngOnInit(): void {
    this.Recharger()
    this.getAll()
  }

  Recharger(){
    this.alertColor="alert alert-primary";
    this.message="Chargement en cours";
    setTimeout(()=>{
      this.getAll();
    },100)
  }
  afficherFormulaire(){
    this.affichage=false;
  }

  afficherListeTasks(){
    this.affichage=true;
  }

  SauvegardeTask(){
    if(this.testId==false){
      this.AjouterTask();
    }else{
      this.ModifierUnTask();
      this.testId=false;
    }
  }

  UpdateTask(taskUpdate:Task){
    this.task=taskUpdate;
    this.testId=true;
    this.affichage=false;
   }

  AjouterTask(){
    this.isafficherMessageChargement=true;
    setTimeout(()=>{
      this.taskService.Ajouter(this.task).subscribe(
        (reponse:Task)=>{
          this.isafficherMessageChargement=false;
          this.affichage=true;
          this.getAll();
          this.task=new Task();
          console.log(reponse);
          this.notificationService.showSuccess("Succès","Ajout de la Tache Réussie")
        },(error)=>{
          this.affichage=false;
          this.alertColor="alert alert-danger";
          this.notificationService.showSuccess("Erreur",error)
          this.isafficherMessageChargement=true;
        },
        ()=>{
          this.isafficherMessageChargement=false;
        }
      );
    },100)
    
  }

  ModifierUnTask(){
    setTimeout(()=>{
      this.taskService.Modifier(this.task).subscribe(
        (reponse:Task)=>{
        this.task=new Task();
        this.affichage=true;
        console.log(reponse);
        this.notificationService.showSuccess("Succès","Modification de la Tache Réussie")
        },(error)=>{
          this.affichage=false;
          this.alertColor="alert alert-danger";
          this.notificationService.showSuccess("Erreur",error)
          this.isafficherMessageChargement=true;
        },
        ()=>{
          this.isafficherMessageChargement=false;
        }
      ); 
    },100)
  }

   supprimerTask(task:Task){
     this.taskService.supprimer(task).subscribe(
       (reponse:String)=>{
        this.notificationService.showSuccess("Succès","Suppression de la Tache Réussie")
        this.ngOnInit()
       },
       (error)=>{
         this.isafficherMessageChargement=true;
         this.alertColor="alert alert-danger";
         this.notificationService.showError("Erreur","Erreur lors de la suppresion de la Tache")
         this.message="Erreur de suppression de données";
       },
       ()=>{
         this.isafficherMessageChargement=false;
       }
     );
   }

  getAll(){
    this.alertColor="alert alert-primary";
    this.message="Chargement en cours";
    this.isafficherMessageChargement=true;
    this.taskService.getAll().subscribe(
      (reponse:Task[])=>{
        this.isafficherMessageChargement=false;
        this.Tasks=reponse;
        this.nbreTasks=this.Tasks.length;
        console.log(this.Tasks);    
      },
      (error)=>{
        this.alertColor="alert alert-danger";
        this.message="Erreur de Recuperation de données";
        this.notificationService.showError("Erreur","Erreur Recuperation de données")
      },
      ()=>{
        this.isafficherMessageChargement=false;
      }
    );
  }

  



}
