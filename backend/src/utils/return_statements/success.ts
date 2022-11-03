//TODO
export class GQLSuccess {
  success() {
    return 'Success!';
  }

  rowCreated() {
    return 'Row succesfully created!';
  }

  rowsCreated(count: number) {
    return 'Succesfully added ' + count + ' rows!';
  }

  rowDeleted() {
    return 'Row succesfully deleted!';
  }

  rowsDeleted(count: number) {
    return 'Succesfully deleted ' + count + ' rows!';
  }

  registrationCompleted() {
    return 'Registration completed, please check your email for confirmation code.'
  }
}
