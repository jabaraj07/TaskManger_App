// METHODS


 // const handleChangeSearch = (val: string) => {
  //   setTaskData(pre => ({...pre, task: val}));
  // };

  // console.log(user?.id);

  // const SearchLink =
  //   Platform.OS == "web"
  //     ? `http://localhost:8080/Task/Get/${user?.id}`
  //     : `http://10.0.2.2:8080/Task/Get/${user?.id}`;

  
  // const SearchLink = user?.id
  // ?Platform.select({web:`http://localhost:8080/Task/Get/${user?.id}`,default:`http://10.0.2.2:8080/Task/Get/${user?.id}`})
  // :null

  // const ToAddLink =
  //   Platform.OS == "web"
  //     ? `http://localhost:8080/Task/${user?.name}/Add`
  //     : `http://10.0.2.2:8080/Task/${user?.name}/Add`;

  // const fetchTask = useCallback(async () => {
  //   if(!SearchLink) return
  //   try {
  //     const response = await axios.get(SearchLink);
  //     setTaskData(pre => ({...pre, data: response.data}));
  //   } catch (error) {
  //     console.log("Fetch Error : " + error);
  //   }
  // }, [SearchLink]);



  // const handlesubmit = useCallback(async () => {
  //   console.log("Task Screen Submit clicked…");
  //   const taskData = {task: TaskData.task};
  //   // quick validation
  //   if (TaskData.task.trim() === "") {
  //     Alert.alert("Empty Task", "Please enter a task before submitting");
  //     return;
  //   }

  //   try {
  //     if (TaskData.EditId) {
  //       // update
  //       const editURL =
  //         Platform.OS === "web"
  //           ? `http://localhost:8080/Task/Update/${TaskData.EditId}`
  //           : `http://10.0.2.2:8080/Task/Update/${TaskData.EditId}`;

  //       await axios.put(editURL, taskData);
  //       Alert.alert("Success", "Task updated successfully!");
  //       // setEditId(null);
  //       setTaskData(pre => ({...pre, EditId: null}));
  //     } else {
  //       // add
  //       await axios.post(ToAddLink, taskData);
  //       Alert.alert("Success", "Task added successfully!");
  //       didJustAdd.current=true;
  //     }
  //     setTaskData(pre => ({...pre, task: ""}));

  //     await fetchTask();

  //     // if (TaskData.data.length > 0) {
  //     //   InteractionManager.runAfterInteractions(() => {
  //     //     flatListRef.current?.scrollToIndex({
  //     //       index: TaskData.data.length - 1,
  //     //       animated: true,
  //     //       viewPosition: 0,
  //     //     });
  //     //   });
  //     // }

  //   } catch (err) {
  //     if (axios.isAxiosError(err) && err.response?.status === 409) {
  //       Alert.alert("Duplicate Task", "This task already exists for this user");
  //     } else {
  //       console.log(err);
  //       Alert.alert("Error", "Failed to save task");
  //     }
  //   }
  //   setTaskData(pre => ({...pre, task: ""}));
  // }, [TaskData.task, TaskData.EditId, ToAddLink, fetchTask]); // <— needed dependencies

 

  // const handleEdit = useCallback((id: number, task: string) => {
  //   console.log("Edit function ->  "+id+" task : "+task);
    
  //   setTaskData(pre => ({...pre, EditId: id, task: task}));
  // }, []);

  // const handleCancel = useCallback(() => {
  //   setTaskData(pre => ({...pre, EditId: null, task: ""}));
  // }, []);



// const prevLen = useRef(0);
// useEffect(() => {
//   if (filteredData.length > prevLen.current && filteredData.length > 0 && didJustAdd) {
//     requestAnimationFrame(() => {
//       recyclerRef.current?.scrollToIndex(filteredData.length - 1, true);
//       setdidJustAdd(false);
//     });
//   }
//   prevLen.current = filteredData.length;
// }, [filteredData.length,didJustAdd]);



//   const filteredData = useMemo(() => {
//   const q = TaskData.search.trim().toLowerCase();
//   return q
//     ? TaskData.data.filter(t => t.task.toLowerCase().includes(q))
//     : TaskData.data;              // ⚠️ return the SAME array when blank
// }, [TaskData.search, TaskData.data]); // correct deps


  // const filter = data2 => {
  //   if (TaskData.search.trim() === "") {
  //     return;
  //   }
  //   let Data = [...data2];
  //   if (TaskData.search.trim() != "") {
  //     Data = Data.filter(item => {
  //       return item.task.toLowerCase().includes(TaskData.search.toLowerCase());
  //     });
  //   }
  //   return Data;
  // };

  // console.log("search---", SearchLink, search, data, task, EditId, ToAddLink);



  /*----------------------------------------------*/

  //RETURN JSX

     {/* <InputContainer
          EditId={TaskData.EditId}
          task={TaskData.task}
          // settask={TaskData.settask}
          handleSearch={handleChangeSearch}
          handlesubmit={handlesubmit}
          handleCancel={handleCancel}
        /> */}

        {/* Task List */}
        {/* {filteredData.length >= 0 && (
          <TaskFlatList
            ref={flatListRef}
            //FilterData={filter(data) ?? data}
            FilterData={filteredData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )} */}

        {/* {filteredData.length > 0 && (
          <TaskRecyclerList
          ref={recyclerRef}
            // FilterData={filter(data) ?? data}
            FilterData={filteredData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )} */}

        
        {/* <TaskFlatList1
          FilterData={filter(data) ?? data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        /> */}
      
        //In RecyclerList onLayout for Autoscroll But some issue is there

        //<View style={{ flex: 1 }} onLayout={() => {
    //  setRecyclerReady(true)
        // recyclerMounted.current = true;

    // if (pendingIndex.current !== null) {
    //   console.log("OnLayout fires ...");
      
    //   recyclerRef.current?.scrollToIndex(pendingIndex.current, true);
    //   pendingIndex.current = null;
    // }
    // if(EditIndex !== null || didJustAdd){
    //   InteractionManager.runAfterInteractions(()=>{
    //     setTimeout(() => {
    //           if (EditIndex !== null) {
    //   console.log("OnLayout fires ...");
    //   recyclerRef.current?.scrollToIndex(EditIndex, true);
    //   setEditIndex(null);
    // }
    //     if (didJustAdd) {
    //   recyclerRef.current?.scrollToIndex(filteredData.length - 1, true);
    //   setdidJustAdd(false);
    // }
    //     }, 100);
    //   })
    // }

  //}}>
  //</view>
