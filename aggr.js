const mongoose = require('mongoose');

let connection  = mongoose.connection;

connection.openUri('mongodb://localhost:27017/course-demo', 
    {   
        useNewUrlParser : true, 
        useUnifiedTopology : true,  
    })
    .then(() => console.log("database connected"));

    let ObjectId = mongoose.Schema.Types.ObjectId;
    const CourseSchema = new mongoose.Schema({

        name                : { type: String, required: true },
        price               : { type: Number, required: true },
        createdBy           : { type: ObjectId, ref: 'teacher', required: true, },
        enrolledStudents    : [{ type: ObjectId, ref: 'student', default: null }],
        enrolledTeachers    : [{ type: ObjectId, ref: 'teacher', default: null }],
        isDeleted           : { type : Boolean, default : false },
        deletedAt           : { type : Date , default : null },
        deletedBy           : { type : ObjectId, ref : 'teacher', default : null }
    
    }, { versionKey: false, timestamps: true });
    
    const Course = mongoose.model('course', CourseSchema, 'courses');


    /********************* Aggregate Pipiline *******************/
 

    // Course.find({}, (err, data) => {
    //     data.forEach(item => console.log(item.price))
    // } )


    // Using $match operator 

    // Course.aggregate([ 
    //     {
    //         $match : { price : { $gte : 3000 }, isDeleted : false }
    //     },
    //     {
    //         $project : { 'name' : 1, 'price' : 1, '_id' : 0}
    //     }
    // ]).exec((err, data) => console.log(data))

/********************************************************************************* */
    // Using group function
    // Below Method will calculate data on all table 
    // Will find minimum, maximum, avg, sum from whole table

    // Course.aggregate([
    //     {
    //         $match : { isDeleted : false }
    //     },
    //     {
    //         $group : {
    //             _id : 'Total',
    //             MinimumCoursePrice      : { $min : '$price' },
    //             MaximumCoursePrice      : { $max : '$price' },
    //             AveragecoursePrice      : { $avg : '$price' },
    //             TotalPriceofCourses     : { $sum : '$price' }
    //         }
    //     },
       
    // ]).exec((err, data) => { 
    //     console.log(data);
    // })

/****************************************************************************** */
    // Counting the no of documents 
    // on variour condition and mongoodb query operators
    // Course.countDocuments({ name : { $in : ['C++', 'Python', 'Java']} })
    //     .exec((error, result) => console.log(result))


    // Distinct records
    // record by distinct name of courses

    // Course.distinct('_name').exec((err, result) => {
    //     console.log(result)
    // })


/******************************************************************** */

// now below experssion will give individual result for each teacher's course which are not deleted. are sorted by total

Course.aggregate([

    // Filtering
    {
        $match : { isDeleted : false }
    },

    // Grouping and summerizing
    {
        $group : {
            _id : 'Revenue',
            total : { $sum : '$price' },
            minimum : { $min : '$price' },
            maximum : { $max : '$price' },
            average : { $avg : '$price' }
        } 
    },

    // Adding the extra field to the resulting document from above pipiline
    // {
    //     $addFields : {
    //         minMax : { $add : ['$minimum', '$maximum'] }
    //     }
    // },

  

    // Sorting  
    {
        $sort : { total : 1 }
    },

    // Skiping the results
    // {
    //     $skip : 1
    // },

    // Limiting the records
    // {
    //     $limit : 2
    // }

]).exec((err, data)=> {
    console.log(data)
})


/********************************************************************** */
// 


/* *

    Virtuals in mongoose


    UserSchema.virtual('name of vartual')
    
    //Getter function
    .get(function() {
        this.firstName + " " + this.lastName;
    })  

    //Setter function
    .set(function() {
        let name = 
    })

*/