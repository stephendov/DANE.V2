    var array = [];

    var by_location = {};
    var loc1array = [];
    var loc1length = 0;

    var oneVStwo = 0;
    var mean1  = 0;
    var variance1 = 0;
    var stddev1 = 0;
    var df12 = 0;
    var critVal12 =0;
    var outcome12 = 0;

    var oneVSMerge = 0;
    var mean2  = 0;
    var variance2 = 0;
    var stddev2 = 0;
    var df1M = 0;
    var critVal1M =0;
    var outcome1M = 0;

    var twoVSMerge = 0;
    var meanM  = 0;
    var varianceM = 0;
    var stddevM = 0;
    var df2M = 0;
    var critVal2M =0;
    var outcome2M = 0;
//-------------------------------------------------------------------------------
    function handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
          // FileReader are supported.
          getAsText(files[0]);
      } else {
          alert('FileReader are not supported in this browser.');
      }
    }


    function getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8      
      reader.readAsText(fileToRead);
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
    }

    function loadHandler(event) {
      var csv = event.target.result;
      processData(csv);
    }

    
    function processData(csv) {
      var allTextLines = csv.split(/\r\n|\n/)

       for(let i = 0; i < allTextLines.length; i++) {
         let row = allTextLines[i].split(',');

         let col = [];
      

        for (let j =0; j < row.length; j++) {
          var string = row[j];
          var num = string.replace(/['"]+/g, '');
          col.push(num);
         }
         array.push(col);
         }

//--------------------------------------------------------------------------

          var array2 = array.map(function(val){
           return val.slice(0, -2);
          });

          for (var  k= 1; k < array2.length; ++k) {
            var row2 = array2[k];
            if (by_location[row2[0]] === undefined) by_location[row2[0]] = [];
            by_location[row2[0]].push(parseInt(row2[1]));
          }

          loc1array = by_location['loc1'];
          loc1length = loc1array.length;
          loc2array = by_location['loc2'];
          loc2length = loc2array.length;
          mergearray = by_location['merge'];
          mergelength = mergearray.length;
          //comboarray = by_location['loc1'] + by_location['loc2']
          console.log("Loc1 wait times:", by_location.loc1)
          console.log("Loc2 wait times:", by_location.loc2)
          console.log("Merge wait times:", by_location.merge)
          //console.log(comboarray);
      //window.alert("Data has been successfully stored")
      //test to see if its reading array properly
      //document.write(array[3][0]);
    }


//---------------------------------------------------------------------------

function errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
          alert("Canno't read file !");
      }
    }
    
//---------------------------------------------------------------------------

function analyze() {
  // This is sum:
   var sum1 = 0;
   for (var r = 0; r<loc1array.length; r++){
     sum1 += loc1array[r];
   }
  console.log("Loc1 Sum: " + sum1);


   // This is mean:
  mean1 = sum1 / loc1array.length;
  console.log("Loc1 Mean: " + mean1);


   // This is variance:
   var diff1 = 0; 
   var numerator1 = 0;
   for (var s = 0; s<loc1array.length; s++){
     diff1 = Math.pow((loc1array[s] - mean1), 2);
     numerator1 += diff1
   }
   var denom1 = (loc1array.length - 1);
   variance1 = numerator1 / denom1;
  console.log("Loc1 Variance: " + variance1);


   // This is standard deviation:
   stddev1 = Math.sqrt(variance1);
  console.log("Loc1 Standard Deviation: " + stddev1);

//-------------------------------------------------------------- Loc2

  // This is sum:
   var sum2 = 0;
   for (var r = 0; r<loc2array.length; r++){
     sum2 += loc2array[r];
   }
  console.log("Loc2 Sum: " + sum2);


   // This is mean:
   mean2 = sum2 / loc2array.length;
  console.log("Loc2 Mean: " + mean2);


   // This is variance:
   var diff2 = 0; 
   var numerator2 = 0;
   for (var s = 0; s<loc2array.length; s++){
     diff2 = Math.pow((loc2array[s] - mean2), 2);
     numerator2 += diff2
   }
   var denom2 = (loc2array.length - 1);
   variance2 = numerator2 / denom2;
  console.log("Loc2 Variance: " + variance2);


   // This is standard deviation:
   stddev2 = Math.sqrt(variance2);
  console.log("Loc2 Standard Deviation: " + stddev2);

//-------------------------------------------------------------- Merge

  // This is sum:
   var sumM = 0;
   for (var r = 0; r<mergearray.length; r++){
     sumM += mergearray[r];
   }
  console.log("Merge Sum: " + sumM);


   // This is mean:
   meanM = sumM / mergearray.length;
  console.log("Merge Mean: " + meanM);


   // This is variance:
   var diffM = 0; 
   var numeratorM = 0;
   for (var s = 0; s<mergearray.length; s++){
     diffM = Math.pow((mergearray[s] - meanM), 2);
     numeratorM += diffM
   }
   var denomM = (mergearray.length - 1);
   varianceM = numeratorM / denomM;
  console.log("Merge Variance: " + varianceM);


   // This is standard deviation:
   stddevM = Math.sqrt(varianceM);
  console.log("Merge Standard Deviation: " + stddevM);

}

//----------------------------------------------------------------------------

  //T-Test Evaluations

function OneVTwo() {

   analyze()
   var t1num = Math.abs(mean1 - mean2);
    var t1denom1 = (Math.pow(stddev1, 2)) / loc1array.length;
    var t1denom2 = (Math.pow(stddev2, 2)) / loc2array.length;
   var t1denom = Math.sqrt(t1denom1 + t1denom2);

   oneVStwo = t1num / t1denom;
  console.log("T-statistic: " + oneVStwo);

  df12 = (loc1array.length + loc2array.length) - 2;
  console.log(df12);
  criticalT12();  
}

function OneVMerge() {

  analyze()
   var t2num = Math.abs(mean1 - meanM);
    var t2denom1 = (Math.pow(stddev1, 2)) / loc1array.length;
    var t2denom2 = (Math.pow(stddevM, 2)) / mergearray.length;
   var t2denom = Math.sqrt(t2denom1 + t2denom2);

   oneVSMerge = t2num / t2denom;
  console.log("T-statistic: " + oneVSMerge);

  df1M = ((loc1array.length + mergearray.length) - 2);
  console.log(df1M);
  criticalT1M();
}

function TwoVMerge() {

  analyze()
   var t3num = Math.abs(mean2 - meanM);
    var t3denom1 = (Math.pow(stddev2, 2)) / loc2array.length;
    var t3denom2 = (Math.pow(stddevM, 2)) / mergearray.length;
   var t3denom = Math.sqrt(t3denom1 + t3denom2);

   twoVSMerge = t3num / t3denom;
  console.log("T-statistic: " + twoVSMerge);

  df2M = ((loc2array.length + mergearray.length) - 2);
  console.log(df2M);
  criticalT2M();
}

//-------------------------------------------------------------------------

  // T-Test Array

  var ttest = 
  [
  [1, 12.706],
  [2, 4.303],
  [3, 3.182],
  [4, 2.776],
  [5, 2.571],
  [6, 2.447],
  [7, 2.365],
  [8, 2.306],
  [9, 2.262],
  [10, 2.228],
  [11, 2.201],
  [12, 2.179],
  [13, 2.160],
  [14, 2.145],
  [15, 2.131],
  [16, 2.120],
  [17, 2.110],
  [18, 2.101],
  [19, 2.093],
  [20, 2.086],
  [21, 2.080],
  [22, 2.074],
  [23, 2.069],
  [24, 2.064],
  [25, 2.060],
  [26, 2.056],
  [27, 2.052],
  [28, 2.048],
  [29, 2.045],
  [30, 2.042],
  [32, 2.037],
  [34, 2.032],
  [36, 2.028],
  [38, 2.024],
  [40, 2.021],
  [50, 2.009],
  [60, 2.000],
  [120, 1.980],
  [Infinity, 1.960]
  ]

//--------------------------------------------------------------

function criticalT12() {

var p = 0;

while (critVal12 == 0) {
  if (df12 -ttest[p][0] > 0) {
    p++;
  } else if (df12 - ttest[p][0] == 0) {
     critVal12 = ttest[p][1];
  } else {
      critVal12 = ttest[p-1][1];
  }
}
console.log("P-val: "+ p);
console.log("Critical T-Value: " + critVal12);

  if (oneVStwo < (-1 * critVal12) || oneVStwo > critVal12) {
    outcome12 = 1;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 1 and 2 are signicantly different!";
  } else {
    outcome12 = 0;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 1 and 2 are not signicantly different.";
  }
 console.log(outcome12);

}
//--------------------------------------------------------------

function criticalT1M() {

var q = 0;

while (critVal1M == 0) {
  if (df1M -ttest[q][0] > 0) {
    q++;
  } else if (df1M - ttest[q][0] == 0) {
     critVal1M = ttest[q][1];
  } else {
      critVal1M = ttest[q-1][1];
  }
}
console.log("Q-val: "+ q);
console.log("Critical T-Value: " + critVal1M);

  if (oneVSMerge < (-1 * critVal1M) || oneVSMerge > critVal1M) {
    outcome1M = 1;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 1 and the Merged Locations are signicantly different!";
  } else {
    outcome1M = 0;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 1 and the Merged Locations are not signicantly different.";
  }
 console.log(outcome1M);
}

//--------------------------------------------------------------

function criticalT2M() {

var w = 0;

while (critVal2M == 0) {
  if (df2M -ttest[w][0] > 0) {
    w++;
  } else if (df2M - ttest[w][0] == 0) {
     critVal2M = ttest[w][1];
  } else {
      critVal2M = ttest[w-1][1];
  }
}
console.log("W-val: "+ w);
console.log("Critical T-Value: " + critVal2M);

  if (twoVSMerge < (-1 * critVal2M) || twoVSMerge > critVal2M) {
    outcome2M = 1;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 2 and the Merged Locations are signicantly different!";
  } else {
    outcome2M = 0;
    document.getElementById("finalresults").innerHTML = "Based on the data submitted, the average wait times between Locations 2 and the Merged Locations are not signicantly different.";
  }
 console.log(outcome2M);
}

//--------------------------------------------------------------------------------------------
