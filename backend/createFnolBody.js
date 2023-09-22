const createFnolBody = function(apiRespnses, policy, claimDetail){
    
 let fnolRecordBody= {};
    fnolRecordBody.fnolType = 'claim';
    fnolRecordBody.claimType = 'daily';
    fnolRecordBody.claimAddress = policy.policyHolderMailingAddress;
    fnolRecordBody.catEventName = '';
    fnolRecordBody.lossDate = '';
    fnolRecordBody.lossTime = claimDetail.lossDate;
    fnolRecordBody.policyDetails = policy;
    fnolRecordBody.lossType=claimDetail.lossType;
    fnolRecordBody.contacts = policy.contacts;
    fnolRecordBody.lossDetails = claimDetail.lossDetails;
    fnolRecordBody.policyNumber= policy.policyNumber;
    fnolRecordBody.additionalDetails= '';
    return fnolRecordBody
}
module.exports =  { createFnolBody}

