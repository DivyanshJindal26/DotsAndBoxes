#include<bits/stdc++.h>
using namespace std;
int main(){
    long long int t;
    cin>>t;
    while(t--){
      long long  int n ;
       cin>>n;
        vector<long long int> vec(n);
        for(int i =0;i<n;i++){
            cin>>vec[i];
        }
        long long int i;
        
        for(i=2;i<=10e18;i*=2){
            unordered_set<long long int> mySet;
            for(auto a : vec){
                
                mySet.insert(a%i);
                
                if (mySet.size()>2) {
                    break;
                } 
            }
            if (mySet.size()==2) break;
        }
        cout<<i<<endl;
    }
}

