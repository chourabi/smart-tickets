import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-human-ressources',
  templateUrl: './human-ressources.component.html',
  styleUrls: ['./human-ressources.component.css']
})
export class HumanRessourcesComponent implements OnInit {

  employees = [];

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.getEmployees();

  }


  async getEmployees(){
    this.employees = [];
    this.db.collection('employees').get().subscribe((data)=>{
      data.docs.forEach(async (doc) => {
        
        // get employees projects
        

        
        var   res  = await  this.db.collection('projects').ref.where('employeesIDs','array-contains',doc.id).get();
        
        
          let projects = [];
          for (let j = 0; j < res.docs.length; j++) {
            const project = res.docs[j].data();

            projects.push(project);
            
          }

          this.employees.push(
            {
              employee:doc.data(),
              id:doc.id,
              projects:projects
            }
          );

        

        
      });
      
    })
  }

  deleteEmployee(id){
    if (confirm('Voulez-vous vraiment supprimer cet employé?')) {
      this.db.collection('employees').doc(id).delete().then((data)=>{ this.getEmployees() })
    }
  }

}
