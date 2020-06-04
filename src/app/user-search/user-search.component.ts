import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
const DEBOUNCE_TIME = 300;
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup;
  searchName: FormControl;
  searchNameShadow: any;
  selectedData: any;
  showEmailSearch: boolean;
  optionsClicked: boolean;
  selectedFiltersdata: any;
  selectedUser: string;
  constructor(private http: HttpClient) { 
    this.showEmailSearch=false;
    this.optionsClicked=false;
    this.searchName = new FormControl('', []);
    this.searchForm = new FormGroup({
        'searchName': this.searchName,
    });
    this.searchName.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.showEmailSearch = true;
      this.searchNameShadow = value;
      if (typeof this.searchNameShadow == 'string' ) {
          this.searchUser(this.searchNameShadow)
      } else {
          this.searchNameShadow = ""
          this.searchUser(this.searchNameShadow)
      }
  });
  }

  ngOnInit(): void {
    console.log(this.selectedData,"=================")
    // this.searchName.valueChanges.pipe(debounceTime(DEBOUNCE_TIME)).subscribe((data) => {
		// 	this.showEmailSearch = true;
		// 	if (!this.optionsClicked) {
    //     if(this.selectedData){
		// 		this.selectedFiltersdata = this.selectedData.filter((searchName) => {
		// 			if (this.searchName.value && (searchName.login + '').includes(this.searchName.value)) {
		// 				return searchName;
		// 			}
    //     });
    //   }
		// 	}
		// });
  }


  repoDetails(userId){
      return this.http.get<any>(`https://api.github.com/users/${userId}/repos`).subscribe((response) => {
       console.log(response, "=================")
     }, (error: { error: { message: string; }; }) => {
       console.log(error, '==============')
       return;
     })
  
}


searchUser(userId){
  const data={
    'q':userId
  }
  let params = new HttpParams()
  Object.keys(data).forEach(function (item) {  
      params = params.set(item, data[item]);
  });
  return this.http.get<any>(`https://api.github.com/search/users`,{ params:params}).subscribe((response) => {
    this.selectedData=response.items;
   console.log(response, "=================")
 }, (error: { error: { message: string; }; }) => {
   console.log(error, '==============')
   return;
 })

}


selectUser(data){
 this.repoDetails(data.id)
  this.selectedUser='UserName'+ + data.login
this.searchForm.controls.searchName.setValue(this.selectedUser)
		this.showEmailSearch = false;
		// this.optionsClicked = true;
		// setTimeout(() => {
		// 	this.optionsClicked = false;
		// }, DEBOUNCE_TIME + 10);
}
}
