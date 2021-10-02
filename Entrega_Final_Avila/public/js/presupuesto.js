function submitForm() {
  $('form').submit(function (event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      form.classList.add('loading');
      setTimeout(function () {
        form.reset();
        form.classList.remove('was-validated');
        form.classList.remove('loading');
        $('#liveToast').toast('show');
      }, 1000);
    } else {
      form.classList.add('was-validated');
    }
  });
}

$(function () {
  submitForm();
});
