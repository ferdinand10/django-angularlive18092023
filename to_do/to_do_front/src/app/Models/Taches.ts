export class Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    completed: boolean;

    public constructor(){
        this.id=0
        this.title=""
        this.description=""
        this.due_date=new Date().toISOString().split('T')[0];
        this.priority=0
        this.completed=false
    }
  }
  