const AboutUs = () => {
  return(
    <div class='container mt-5'>
      <div class='text-center mb-4' style={{fontWeight: 500}}>
        This page was built using the below tech stack
      </div>
      <div class='text-center mb-4'>
        <span style={{fontWeight: 500}}>Front-end:</span> ReactJS<br/>
        <span style={{fontWeight: 500}}>Web Framework:</span> Express.js<br/>
        <span style={{fontWeight: 500}}>Back-end:</span> PostgreSQL<br/>
        <span style={{fontWeight: 500}}>Front-end Library:</span> Bootstrap<br/>
        <span style={{fontWeight: 500}}>Form Library:</span> Formik<br/>
      </div>
      <div class='d-flex flex-row justify-content-center'>
      <a href='https://www.linkedin.com/in/matthewauwjh/' target='none'><i class="fab fa-linkedin" style={{fontSize: '30px'}}></i></a>
      <a href='https://mauwjh.github.io/resume/' target='none'><i class="fab fa-medium ml-4" style={{fontSize: '30px'}}></i></a>
      </div>
    </div>
  )
}

export default AboutUs