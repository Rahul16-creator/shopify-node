const multer=require('multer')
let path;

const storage=multer.diskStorage({
    destination:function(req,file,cb){
          cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        path=new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
        // console.log(path)
      cb(null, path)
    }
  })



  const upload=multer({
   // storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

        if(!file.originalname.match(/\.(doc|docx|jpg|jpeg|png|pdf|csv)$/)){
              return cb(new Error('please upload the file correctly')) 
        }
        cb(undefined,true)
    }
})

const name=()=>{
  return path
}


module.exports={
  upload,
  name
}