

function STRUCT_Chain(){

	// head of chained list

	this.head = null;
	// tail of chained list
	this.tail = null;

	// quick access
	this.map = new Map();
}


STRUCT_Chain.prototype = {

		append : function(id, object){

			// define new entry
			var entry = {};
			entry.value=object;
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

			// update map
			this.map.set(id, object);

		},

		remove : function(id){
			var entry = this.map.get(id);
			entry.isEnabled = false;
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

			// update map
			this.map.remove(id);
		},

		iterate : function(func){
			var entry = this.head;
			while(entry!=null){
				func(entry.value);
				entry = entry.next;
			}
		},

		get : function(id){
			return this.map.get(id);
		}
};