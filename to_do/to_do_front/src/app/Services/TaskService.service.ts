import { NgForm } from "@angular/forms";
import { HttpClientModule,HttpClient} from '@angular/common/http';
import { Injectable, Type } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../Models/Taches";


@Injectable({
  providedIn:'root'
})

export class TaskService{

    constructor(private httpClient: HttpClient) { }

    Ajouter(task:Task):Observable<Task>{
        return this.httpClient.post<Task>("http://127.0.0.1:8000/tasks/",task);
    }
    

    supprimer(task:Task):Observable<String>{
        return this.httpClient.delete(`http://127.0.0.1:8000/tasks/`+task.id,{responseType:'text'});
      }

    Modifier(task:Task):Observable<Task>{
      return this.httpClient.put<Task>(`http://127.0.0.1:8000/tasks/`+7+"/",task)
    }

    public getAll():Observable<Task[]>{
        return this.httpClient.get<Task[]>("http://127.0.0.1:8000/tasks/");
      }
}