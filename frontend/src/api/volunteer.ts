import server from "./server"; 
import snackbar from "./snackbar";

// 获取所有志愿者申请
export const getApplications = async () => {
  try {
    const response = await server.get("/volunteers/");
    return response;
  } catch (error) {
    console.error('获取申请列表失败:', error);
    throw error; 
  }
};

export const updateApplicationStatus = async (activity_id: string, applicant_id: string, status: string) => {
  try {
    const response = await server.patch(
      `/volunteers/${activity_id}?applicant_id=${applicant_id}`, 
      { activity_id , applicant_id , status },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(`更新申请状态失败: ${error}`);
    throw error; 
  }
};

export const updateVolunteerApplicationStatus = async (application_id: string, status: string) => {
  try {
    await server.patch(
      `volunteers/applications/${application_id}`,
      { application_id , status} ,
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`更新志愿者申请状态失败: ${error}`);
    throw error; 
  }
}

export const updateActivity = async (activity_id: string , ) => {
  try {
    const response = await server.patch(`/activities/${activity_id}`);
    return response.data;
  } catch (error) {
    console.error('更新活动失败:', error);
    throw error; 
  }
}

export const getMyRegistrations = async() => {
  try {
    const response = await server.get("/volunteers/my");
    return response.data;
  } catch (error) {
    console.error('获取我的报名列表失败:', error);
    throw error; 
  }
}

export const getMyApplications = async () => {
    try {
      const response = await server.get("/volunteers/applications");
      return response.data;
    } catch (error) {
      console.error('获取我的申请列表失败:', error);
      throw error; 
    }
  };

  export const submitApplication = async (applicant : any) => {
    try {
      const response = await server.post(
        "/volunteers/applications",
        applicant,
        { headers: { 'Content-Type': 'application/json' } });
      console.log(response)
      if (response.status === 400) {
        snackbar.error("您已提交过申请且正在处理中，请勿重复提交！");
        throw new Error("您已提交过申请且正在处理中，请勿重复提交！");
      } else {
        return response.data; 
      }
    } catch (error) {
      console.error('提交申请失败:', error);
      throw error; 
    }
  };