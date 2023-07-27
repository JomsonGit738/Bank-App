import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  searchKey:string=""
  UserTransactions:any = []
  constructor(private api:ApiService){}

  ngOnInit(): void {
    //make an api call
    this.api.getTransactions().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.UserTransactions = res
      },error:(err:any)=>{
        console.log(err);
      }
    })
  }

  //generate PDF
  generatePDF(){

    //1. create object for jspdf
    let pdf = new jspdf()

    //2. create title tow
    let title_row = ['Type','Credit Account','Amount']
    let table_body:any = []

    //3. designing pdf content
    pdf.setFontSize(16)
    pdf.text("All transactions",10,10)
    pdf.setFontSize(12)
    
    //4. covert transactions to array of array
    for(let element of this.UserTransactions){
      var temp = [element.transaction_type,element.toAcno,element.amount]
      table_body.push(temp)
    }
    (pdf as any).autoTable(title_row,table_body)

    //5. view in new windows
    pdf.output('dataurlnewwindow')

    //6. download pdf
    pdf.save("transactions.pdf")
    
  }
  

}
