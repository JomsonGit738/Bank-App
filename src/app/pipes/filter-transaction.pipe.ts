import { ReturnStatement } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  transform(transactionArray:any[],searchKey:string,property:string): any {
    
    //returning array category
    const result:any=[]

    //checking input is valid
    if(!transactionArray || searchKey=="" || property==""){
      return transactionArray
    }
    transactionArray.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchKey.trim().toLowerCase()))
      {
        result.push(item)
      }
    })

    return result;
  }

}
