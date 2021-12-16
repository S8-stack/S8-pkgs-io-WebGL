

function STRUCT_Chain(){

	// head of chained list
	this.head = null;
	
	// tail of chained list
	this.tail = null;
}


STRUCT_Chain.prototype = {

		append : function(){

			// define new entry
			var entry = {};
			entry.isRemoved = false;
			entry.previous=null;
			entry.next=null;

			// if first element
			if(this.head==null){
				this.head = entry;
				this.tail = entry;
			}
			else{
				
				// double link
				entry.previous = this.tail;
				this.tail.next = entry;
				
				entry.next = null;
				this.tail = entry;
			}
			
			return entry;
		},

		iterate : function(func){
			var entry = this.head;
			while(entry!=null){
				if(!entry.isRemoved){
					func(entry);
				}
				else{
					if(entry.previous!=null){
						entry.previous.next = entry.next;
					}
					else{ // is head
						this.head = entry.next;
					}

					if(entry.next!=null){
						entry.next.previous = entry.previous;
					}
					else{ // is tail
						this.tail = entry.previous;
					}
				}	
				entry = entry.next;
			}
		}
};