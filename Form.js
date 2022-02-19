import react from 'react';
import './Form.css';

export default class Form extends react.Component {
   state = {
      index: '01',
      firstName: '',
      lastName: '',
      selected: 'Gender',
      checkingValue: false,
      initialPassword: '',
      finalPassword: '',
      emailValue: '',
      phoneValue: '+880',
      dob: '',
      appendEle: '',
      fNErr: '',
      lNErr: '',
      eErr: '',
      pErr: '',
      passErr: '',
      dobErr: '',
      checkedErr: '',
   };
   textHandler = (e) => {
      if (e.target.name === 'firstName') {
         this.setState({
            firstName: e.target.value,
         });
      } else if (e.target.name === 'lastName') {
         this.setState({
            lastName: e.target.value,
         });
      } else if (e.target.name === 'selectItem') {
         this.setState({
            selected: e.target.value,
         });
      } else if (e.target.name === 'checkingBox') {
         this.setState({
            checkingValue: e.target.checked,
         });
      } else if (e.target.name === 'initialPassword') {
         this.setState({
            initialPassword: e.target.value,
         });
      } else if (e.target.name === 'finalPassword') {
         this.setState({
            finalPassword: e.target.value,
         });
      } else if (e.target.name === 'email') {
         this.setState({
            emailValue: e.target.value,
         });
      } else if (e.target.name === 'phone') {
         this.setState({
            phoneValue: e.target.value,
         });
      } else if (e.target.type === 'date') {
         this.setState({
            dob: e.target.value,
         });
      }
   };
   submitHandler = (e) => {
      e.preventDefault();
      const {
         index,
         emailValue,
         firstName,
         lastName,
         phoneValue,
         initialPassword,
         finalPassword,
         selected,
         checkingValue,
         dob,
      } = this.state;

      let newEle = (
         <tr>
            <td>{index}</td>
            <td>{firstName + ' ' + lastName}</td>
            <td>{emailValue}</td>
            <td>{phoneValue}</td>
            <td>{selected}</td>
            <td>{dob}</td>
         </tr>
      );
      if (firstName.trim() === '') {
         this.setState({ fNErr: 'Required field*' });
      } else if (lastName.trim() === '') {
         this.setState({ lNErr: 'Required field*', fNErr: '' });
      } else if (emailValue.trim().search(/[a-z]+@[a-z]+\.[a-z]+/gi)) {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: 'Please enter valid email*',
         });
      } else if (
         !phoneValue.trim().startsWith('+880') ||
         phoneValue.trim().length !== 14
      ) {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: 'Enter a valid phone*',
         });
      } else if (
         initialPassword !== finalPassword ||
         (initialPassword === '' && finalPassword === '')
      ) {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: '',
            passErr: 'Password does not match*',
         });
      } else if (!dob) {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: '',
            passErr: '',
            dobErr: 'Select your date of birth*',
         });
      } else if (selected === 'Gender') {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: '',
            passErr: '',
            dobErr: '',
            genErr: 'Plese select your gender*',
         });
      } else if (!checkingValue) {
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: '',
            passErr: '',
            dobErr: '',
            genErr: '',
            checkedErr: 'Check to accept our terms & conditions',
         });
      } else {
         this.setState((pre) => {
            if (pre.index.length === 1) {
               return { index: `0${Number(pre.index) + 1}` };
            } else if (
               pre.index.length === 2 &&
               pre.index[0] === '0' &&
               pre.index[1] !== '9'
            ) {
               return { index: `0${Number(pre.index) + 1}` };
            } else {
               return { index: `${Number(pre.index) + 1}` };
            }
         });
         this.setState({
            fNErr: '',
            lNErr: '',
            eErr: '',
            pErr: '',
            passErr: '',
            dobErr: '',
            genErr: '',
            checkedErr: '',
         });
         this.setState(({ appendEle }) => ({
            appendEle: (
               <>
                  {appendEle} {newEle}
               </>
            ),
         }));
         this.setState({
            firstName: '',
            lastName: '',
            emailValue: '',
            phoneValue: '+880',
            initialPassword: '',
            finalPassword: '',
            dob: '',
            selected: '',
            checkingValue: false,
         });
      }
   };
   render() {
      const {
         firstName,
         lastName,
         selected,
         checkingValue,
         initialPassword,
         finalPassword,
         emailValue,
         phoneValue,
         dob,
         appendEle,
         fNErr,
         lNErr,
         eErr,
         pErr,
         passErr,
         dobErr,
         genErr,
         checkedErr,
      } = this.state;
      return (
         <>
            <h1>Client-side form validation</h1>
            <form onSubmit={this.submitHandler} className="textform">
               <p>{fNErr}</p>
               <p>{lNErr}</p>
               <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.textHandler}
               />

               <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.textHandler}
               />
               <p>{eErr}</p>
               <p>{pErr}</p>
               <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={emailValue}
                  onChange={this.textHandler}
               />
               <input
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  value={phoneValue}
                  onChange={this.textHandler}
               />
               <p>{passErr}</p>
               <p></p>
               <input
                  name="initialPassword"
                  type="password"
                  placeholder="Enter password"
                  value={initialPassword}
                  onChange={this.textHandler}
               />
               <input
                  name="finalPassword"
                  type="password"
                  placeholder="Re-type password"
                  value={finalPassword}
                  onChange={this.textHandler}
               />
               <p>{dobErr}</p>
               <p>{genErr}</p>
               <input type="date" value={dob} onChange={this.textHandler} />
               <select
                  name="selectItem"
                  value={selected}
                  onChange={this.textHandler}
               >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
               </select>
               <p>{checkedErr}</p>
               <div className="checkContainer">
                  <input
                  id='checkbox'
                     name="checkingBox"
                     type="checkbox"
                     checked={checkingValue}
                     onChange={this.textHandler}
                  />
                  <label for="checkbox">
                     you agree to our Terms, Data Policy and Cookie Policy. You
                     may receive SMS notifications from us and can opt out at
                     any time.
                  </label>
               </div>
               <input type="submit" value="SUBMIT" />
            </form>
            <table>
               <thead>
                  <tr>
                     <th>Index</th>
                     <th>Name</th>
                     <th>E-mail</th>
                     <th>Phone</th>
                     <th>Gender</th>
                     <th>Date Of Birth</th>
                  </tr>
               </thead>
               <tbody>{appendEle}</tbody>
            </table>
         </>
      );
   }
}
