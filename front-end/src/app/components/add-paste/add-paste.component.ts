import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { Paste } from '../../models/paste';
import { PasteService } from '../../services/paste.service';

@Component({
  selector: 'app-add-paste',
  templateUrl: './add-paste.component.html',
  styleUrls: ['./add-paste.component.css']
})
export class AddPasteComponent implements OnInit {

  loading = false;
  submitted = false;
  data: any;
  public _pasteForm: FormGroup;
  public paste: any;
  

  constructor(
    private alertService: FlashMessagesService, 
    private _formBuilder: FormBuilder,
    private pasteService: PasteService,
    private router: Router, 
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this._pasteForm = this._formBuilder.group({
      title: [''],
      content: [ '', [Validators.required]],
      exposure: ['']
    });
  }

  get f() { return this._pasteForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this._pasteForm.invalid) {return;}
      this.loading = true;
     
      let exp = this.f.exposure.value;
      
      if (exp){
        this.data = {paste: this._pasteForm.value}
      }else{
        this.data = {paste: {title: this.f.title.value, content: this.f.content.value } }
      }  
     
      this.pasteService.addPaste(this.data).subscribe(
         result => {
          if(result.status == 422){
             for (var key in result.msg){
             let error_msg = key.charAt(0).toUpperCase() + key.slice(1)+": "+result.msg[key];
              this.alertService.show(error_msg,{cssClass:'alert-danger', timeout: 5000});

              this.submitted = false;
              this.loading = false;
            }
          }else{
            
            let uuid = result.data.uuid;
            let private_uuid = result.data.private_uuid;
            let id = result.data.id;

            if(private_uuid){
              this.router.navigate(['/paste/',id,private_uuid]);
            }else{
              this.router.navigate(['/paste/',uuid]);
            }
          }
        },
          error => {
            console.log(error);           
        })
  }
}
