import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.sendEmail(this.contactForm.value);
    }
  }

  sendEmail(formData: any) {
    emailjs.send('service_x448yvs', 'template_c0tuisk', {
      from_name: formData.name,
      message: formData.message,
      reply_to: formData.email,
    }, '1El_H66Ms5UunIOCe')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert('Message Sent Successfully!');
      }, (error: { text: any; }) => {
        console.error(error.text);
        alert('Failed to Send Message!');
      });
  }

}
